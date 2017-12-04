import jsonp from '@/common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/getLyric';

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}

export function getSongUrl(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const options = {
    param: 'callback',
    prefix: 'jp'
  }

  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    cid: 205361747,
    needNewCode: 0,
    uin: 0,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 8421138817
  })

  return jsonp(url, data, options)
}