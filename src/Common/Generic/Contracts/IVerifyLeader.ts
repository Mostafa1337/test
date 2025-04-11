export interface IVerifyLeader<T>
{
    /**
     * Verify if Entity leaderId is same as the user Id provided
     * @param {string} Id - The ID of the Entity
     * @param  {string} userId - The ID of the user 
     * @returns {Promise<T>} the data to be returned
     * @throws {NotFoundException} if community is not found or if user is not the community leader
     */
    VerifyLeaderId(Id: string,userId: string): Promise<T>;
}