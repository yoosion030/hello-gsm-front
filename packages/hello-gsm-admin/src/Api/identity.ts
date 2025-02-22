import RequestApi from 'Utils/Libs/requestApi';
import { IdentityController } from 'Utils/Libs/requestUrls';

class Identity {
  /**
   * @param userID
   * @returns 특정 사용자의 본인인증 정보를 가져옵니다.
   */
  getUserIdentity(userID: string) {
    try {
      return RequestApi({
        method: 'GET',
        url: IdentityController.getUserIdentity(userID),
      });
    } catch (error: any) {
      return error;
    }
  }
}

export default new Identity();
