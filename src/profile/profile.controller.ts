import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { User } from "@app/users/decorators/user.decorator";
import { ProfileService } from "@app/profile/profile.service";
import { ProfileResponseInterface } from "@app/profile/interfaces/profileResponse.interface";
import { JwtGuard } from "@app/users/guards/jwt.guard";

@Controller("profile")
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) {
    }

    @Get(":username")
    async profile(
        @Param("username") username: string,
        @User("id") currentUserId: number | null
    ): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.getProfile(username, currentUserId)
        return this.profileService.getProfileResponse(profile)
    }

    @UseGuards(JwtGuard)
    @Post(':username/follow')
    async follow(
        @Param('username') profileUsername: string,
        @User('id') currentUserId: number
    ): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.follow(profileUsername, currentUserId)
        return await this.profileService.getProfileResponse(profile)
    }

    @UseGuards(JwtGuard)
    @Delete(':username/follow')
    async unfollow(
        @Param('username') profileUsername: string,
        @User('id') currentUserId: number
    ): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.unfollow(profileUsername, currentUserId)
        return await this.profileService.getProfileResponse(profile)
    }
}
