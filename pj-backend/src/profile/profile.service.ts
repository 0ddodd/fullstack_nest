import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto';

@Injectable()
export class ProfileService {

    constructor(private readonly prisma: PrismaService){}

    async createProfile(createProfileDto: CreateProfileDto) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email: createProfileDto.email,
            }
        });
        if(profile) {
            throw new Error('Profile with this email already exist.')
        }

        return this.prisma.profile.create({
            data: createProfileDto
        });
    };

    async getProfileById(id: number) {
        const profile = this.prisma.profile.findUnique({
            where: {id},
            include: {
                servers: {
                    include: {
                        channels: true
                    }
                }
            }
        });

        if (!profile) {
            throw new Error(`Profile with ${id} was not found.`)
        }

        return profile;
    };

    async getProfileByEmail(email: string) {
        const profile = this.prisma.profile.findUnique({
            where: {email},
            include: {
                servers: {
                    include: {
                        channels: true
                    }
                }
            }
        });

        if (!profile) {
            throw new Error(`Profile with ${email} was not found.`)
        }

        return profile;
    }

    
}
