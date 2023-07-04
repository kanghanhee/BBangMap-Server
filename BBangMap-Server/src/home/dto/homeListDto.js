const { bakeryListDto } = require('./bakeryListDto');
const { popularAreaListDto } = require('./popularAreaListDto');
const { popularBakeryListDto } = require('./popularBakeryListDto');
const { popularBreadListDto } = require('./popularBreadListDto');
const { popularReviewListDto } = require('./popularReviewListDto');

const homeListDto = async (
  popularBakeryList,
  popularBreadList,
  popularAreaList,
  popularReviewList,
  bakeryList,
  reviewList,
) => {
  return {
    sectionList: [
      {
        header: {
          type: 'header',
          title: '최근 추가된 빵집 리스트',
        },
        item: {
          type: 'horizontalBakeryList',
          itemList: await bakeryListDto(bakeryList),
        },
      },
      {
        header: {
          type: 'header',
          title: '이번주에 가장 많이 검색된 빵집',
        },
        item: {
          type: 'horizontalBakeryList',
          itemList: popularBakeryListDto(popularBakeryList),
        },
      },
      {
        header: {
          type: 'header',
          title: '이번주에 가장 많이 검색된 빵',
        },
        item: {
          type: 'horizontalBreadList',
          itemList: popularBreadListDto(popularBreadList),
        },
      },
      {
        header: {
          type: 'header',
          title: '이번주에 가장 많이 검색된 지역',
        },
        item: {
          type: 'horizontalAreaList',
          itemList: popularAreaListDto(popularAreaList),
        },
      },
      {
        header: {
          type: 'header',
          title: '이번주에 좋아요 많이 받은 리뷰',
        },
        item: {
          type: 'horizontalReviewList',
          itemList: await popularReviewListDto(popularReviewList),
        },
      },
      {
        header: {
          type: 'header',
          title: '최근 리뷰',
        },
        item: {
          type: 'verticalReviewList',
          itemList: reviewList,
        },
      },
    ],
  };
};

module.exports = { homeListDto };
