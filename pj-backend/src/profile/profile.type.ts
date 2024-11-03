import { ObjectType, Field } from "@nestjs/graphql";
import { Member } from "src/member/member.types";
import { Channel, Server } from "src/server/types";

@ObjectType()

export class Profile {
    @Field()
    id: number;

    @Field({nullable: true})
    email: string;

    @Field(()=>[Server], { nullable: 'itemsAndList' })
    servers: Server[];

    @Field()
    imageUrl: string;

    @Field({ nullable: true})
    inviteCode: string;

    @Field()
    profileId: number;

    @Field(() => Profile, { nullable: true})
    profile: Profile;

    @Field(() => [Channel], { nullable: 'itemsAndList'})
    members: Member[];

    @Field(() => [Channel], { nullable: 'itemsAndList'})
    channels: Channel[];

}
