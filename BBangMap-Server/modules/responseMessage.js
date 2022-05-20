module.exports = {
  NULL_VALUE: '필요한 값이 없습니다.',
  OUT_OF_VALUE: '파라미터 값이 잘못 되었습니다.',
  UNAUTHORIZED: '권한없음',

  /* 서버에러 */
  INTERNAL_SERVER_ERROR: '서버 내부 오류',

  /*로그인*/
  SUCCESS_LOGIN: '로그인 성공',
  SUCCESS_LOGOUT: '로그아웃 성공',

  /*토큰*/
  INVALID_UUID: '존재하지 않는 UUID입니다.',
  EMPTY_TOKEN: '빈 토큰',
  EXPIRED_TOKEN: '토큰 기간 만료',
  INVALID_TOKEN: '유효하지 않은 토큰',
  SUCCESS_REISSUE_TOKEN: '토큰 재발생 성공',

  /*빵집*/
  SUCCESS_GET_BAKERY: '빵집불러오기 성공',
  SUCCESS_GET_BAKERY_IMG: '빵집 이미지 불러오기 성공',
  SUCCESS_SAVED_BAKERY: '빵집 보관하기 성공',
  SUCCESS_REGISTRATION_BAKERY: '빵집 등록 성공',
  SUCCESS_GET_BAKERY_LOCATION_INFO: '빵집 위치 정보 불러오기 성공',
  SUCCESS_VISITED_BAKERY: '빵집 방문 성공',
  SUCCESS_CANCEL_VISITED_BAKERY: '빵집 방문 취소 성공',
  SUCCESS_GET_BAKERY_LIST: '빵집리스트 불러오기 성공',
  SUCCESS_UPDATE_BAKERY: '빵집 수정 성공',
  SUCCESS_DELETE_BAKERY: '빵집 삭제 성공',
  SUCCESS_SEARCH_REQUEST_BAKERY: '요청 빵집 검색 성공',
  SUCCESS_REQUEST_BAKERY: '빵집 요청 성공',
  NO_BAKERY: '일치하는 빵집이 없습니다.',
  DUPLICATE_BAKERY: '이미 요청된 빵집입니다.',

  /*후기*/
  SUCCESS_GET_REVIEW: '후기불러오기 성공',
  SUCCESS_SAVED_REVIEW: '후기 보관하기 성공',
  SUCCESS_UNSAVED_REVIEW: '보관된 후기 삭제',
  SUCCESS_DELETE_REVIEW: '후기 삭제 성공',
  SUCCESS_CREATE_REVIEW: '후기 작성 성공',
  SUCCESS_LIKED_REVIEW: '후기 추천하기 성공',
  SUCCESS_UNLIKED_REVIEW: '후기 추천하기 삭제',
  SUCCESS_UPDATE_REVIEW: '후기 수정 성공',
  NO_SAVED_REIVEW: '해당 빵집의 보관된 후기가 없습니다',

  /*사용자*/
  SUCCESS_SIGN_UP: '회원가입 성공',
  SUCCESS_UPDATE_USER: '프로필 수정 성공',
  SUCCESS_DELETE_USER: '프로필 삭제 성공',
  SUCCESS_VERIFY_NICKNAME: '사용 가능한 닉네임입니다.',
  SUCCESS_GET_NICKNAME: '랜덤 닉네임 생성 성공',
  SUCCESS_GET_MY_PAGE: '마이페이지 불러오기 성공',
  ALREADY_USER: '이미 존재하는 회원입니다.',
  ALREADY_NICKNAME: '이미 존재하는 닉네임입니다.',
  INVALID_USER: '유효하지 않는 회원입니다.',

  /*미션*/
  SUCCESS_CREATE_MISSION: '미션 추가 성공',
  SUCCESS_GET_MONTHLY_MISSION: '이달의 미션 메인 조회 성공',
  SUCCESS_GET_SUCCEEDED_MISSION: '달성한 미션 조회 성공',
  SUCCESS_GET_USER_RANK: '등급 조회 성공',
  NO_MISSION: '미션이 존재하지 않습니다.',
  NOT_SUCCEEDED: '달성하지 않은 미션입니다.',

  /*큐레이션*/
  SUCCESS_CREATE_CURATION: '큐레이션 추가 성공',
  SUCCESS_GET_CURATION: '큐레이션 불러오기 성공',
  SUCCESS_LIKE_CURATION: '큐레이션 좋아요 성공',
  SUCCESS_UNLIKE_CURATION: '큐레이션 좋아요 취소 성공',
};
