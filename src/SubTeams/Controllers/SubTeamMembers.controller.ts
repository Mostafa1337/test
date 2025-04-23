import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Query, Search, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";
import { ISubTeamsMembersService } from "../Services/Members/ISubTeamMembers.service";
import { MemberSearchDto } from "../Dtos/SubTeamMembersDtos/MemberSearch.dto";
import { SubTeamSearchId, SubTeamSearchIdWithUserId } from "../Dtos/SubTeamSearchId";
import { SubTeamParamDecorator, SubTeamParamPipe } from "./SubTeamParam";
import { JWTGaurd } from "src/AuthModule/Gaurds/JWT.gaurd";
import { CurrentUserDecorator } from "src/AuthModule/CurrentUser.decorator";
import { TokenPayLoad } from "src/AuthModule/Dtos/TokenPayload";
import { ResponseType } from "src/Common/ResponseType";
import { MemberReturnDto } from "../Dtos/SubTeamMembersDtos/MemberReturn.dto";
import { JoinLinkDto } from "../Dtos/SubTeamMembersDtos/JoinLink.dto";
import { AddMemberDto } from "../Dtos/SubTeamMembersDtos/AddMember.dto";

@ApiTags('subteams/members')
@Controller('communities/:communityId/teams/:teamId/subteams/:subTeamId/members')
@SubTeamParamDecorator(true)
@UseGuards(JWTGaurd)
@ApiBearerAuth()
export class SubTeamMembersController
{
    @Inject(ISubTeamsMembersService)
    private readonly memberService:ISubTeamsMembersService;

    @Get()
    @ApiOperation({ summary: 'Get Sub teams paginated' })
    @ApiOkResponse({type:MemberReturnDto,description:"THIS IS Pagination Response"})
    async GetMembers
    (
        @Query() pagi:MemberSearchDto,
        @Param(new SubTeamParamPipe()) search:SubTeamSearchId,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<PaginationResponce<MemberReturnDto>>>
    {
        const data = await this.memberService.GetBySubTeam(search.subTeamId,user.UserId,pagi)
        return new ResponseType(HttpStatus.OK,"Get members paginated",data);
    }

    @Post("join")
    @ApiOperation({ summary: 'Join sub team',description:`
        User joining the sub team and if success will return the join link
        return error when the user in other sub team 
        ` })
    @ApiOkResponse({type:JoinLinkDto})
    async Join
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchId,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<JoinLinkDto>>
    {
        const dto = await this.memberService.Join(search.subTeamId,user.UserId);
        return new ResponseType(HttpStatus.OK,"Joined successfully",dto);
    }

    @Post("add")
    @ApiOperation({ summary: 'Add member to sub team',description:`
        only available to the heads and leaders
        returns error if user in other sub team
        and if IsHead = true returns error if the user is team/community leader
        ` })
    @ApiBody({type:AddMemberDto})
    @ApiOkResponse()
    async AddMember
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchId,
        @Body() dto:AddMemberDto,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<void>>
    {
        await this.memberService.AddMember(search.subTeamId,dto.UserEmail,dto.IsHead,dto.JoinDate,user.UserId);
        return new ResponseType(HttpStatus.OK,"Joined successfully");
    }

    @Post(":memberId/accept")
    @ApiOperation({ summary: 'accept member to sub team',description:`
        only available to the heads and leaders
        Accept member to sub team
        returns error if the member not found or left or has been accepted
        ` })
    @ApiOkResponse()
    async AcceptMember
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchIdWithUserId,
        @Param("memberId") memberId:string,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<void>>
    {
        await this.memberService.Accept(search.subTeamId,memberId,user.UserId)
        return new ResponseType(HttpStatus.OK,"Accepted successfully");
    }

    @Post(":memberId/decline")
    @ApiOperation({ summary: 'delete member from sub team',description:`
        only available to the heads and leaders
        This method can be called the leader/head want to decline joining request of user or kick him 
        Note:- it just make the leaveDate = new Date() so the member will be still exist but with leave date != null
        throw error if the user already left
        `})
    @ApiOkResponse()
    async KickMember
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchIdWithUserId,
        @Param("memberId") memberId:string,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<void>>
    {
        await this.memberService.DeleteMember(search.subTeamId,memberId,user.UserId)
        return new ResponseType(HttpStatus.OK,"Deleted successfully");
    }

    @Post(":memberId/head")
    @ApiOperation({ summary: 'update member head status',description:`
        only available to the heads and leaders
        inverse the already IsHead member status 
        throw error if the user is team/community leader
        `})
    @ApiOkResponse()
    async UpdateHead
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchIdWithUserId,
        @Param("memberId") memberId:string,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<void>>
    {
        await this.memberService.UpdateHead(search.subTeamId,memberId,user.UserId)
        return new ResponseType(HttpStatus.OK,"Updated successfully");
    }

    @Post("leave")
    @ApiOperation({ summary: 'member leave',description:`
        member want to leave sub team
        throw error if he is not yet accepted or he is already left
        `})
    @ApiOkResponse()
    async MemberLeave
    (
        @Param(new SubTeamParamPipe()) search:SubTeamSearchId,
        @CurrentUserDecorator() user:TokenPayLoad
    ) : Promise<ResponseType<void>>
    {
        await this.memberService.Leave(search.subTeamId,user.UserId)
        return new ResponseType(HttpStatus.OK,"Left successfully");
    }
}