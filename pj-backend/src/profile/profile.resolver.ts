import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProfileDto } from './dto';
import { Profile } from './profile.type';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {

    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => Profile)
    async createProfile(@Args('input') input: CreateProfileDto){
        return this.profileService.createProfile(input)
    }

    @Query(() => Profile)
    async getProfileById(@Args('profileId') profileId: number){
        return this.profileService.getProfileById(profileId);
    }
}
