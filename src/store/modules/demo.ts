import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { test } from '@/api/demo'

// 创建一个异步的thunk action，用于获取推荐数据
export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    // 获取轮播图数据
    test().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
  }
)

// 榜单ID数组
const rankingIds = [19723756, 3779629, 2884035]

// 创建一个异步的thunk action，用于获取榜单数据
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    // 通过循环获取每个榜单的数据
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      // promises.push(getPlaylistDetail(id))
    }

    // 使用Promise.all等待所有请求完成后处理结果
    Promise.all(promises).then((res) => {
      // 过滤有效的榜单数据
      const playlists = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

// 推荐模块的初始状态
interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  settleSingers: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}

// 创建推荐模块的slice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    // 定义各个同步action对状态的修改逻辑
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingersAction(state, { payload }) {
      state.settleSingers = payload
    }
  }
})

// 导出同步action
export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction,
  changeRankingsAction,
  changeSettleSingersAction
} = recommendSlice.actions

export default recommendSlice.reducer
