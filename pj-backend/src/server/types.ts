import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Member } from "src/member/member.types";
import { Profile } from "src/profile/profile.type";

@ObjectType()

export class Channel {
    @Field()
    id: number;

    @Field({nullable: true})
    name: string;

    @Field(()=>ChannelType)
    type: ChannelType;

    @Field()
    createdAt: String;

    @Field()
    updatedAt: String;

    @Field(()=>[Member], {nullable: true})
    members: Member[];
}

export enum ChannelType {
    TEXT="TEXT",
    AUDIO="AUDIO",
    VIDEO="VIDEO"
}

registerEnumType(ChannelType, {
    name: "ChannelType",
    description: "Defines the type of channel",
});

@ObjectType()
export class Server {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    imageUrl: string;

    @Field({nullable: true})
    inviteCode: string;

    @Field()
    profieId: number;

    @Field(() => Profile, { nullable: true })
    profile: Profile;

    @Field(() => [Member], { nullable: "itemsAndList" })
    members: Member[];

    @Field(() => [Channel], { nullable: 'itemsAndList' })
    channels: Channel[]
}