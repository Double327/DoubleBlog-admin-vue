import request from '@/axios'

// 查询任务日志列表
export function getQuartzDetail(id) {
  return request({
    url: '/log/quartzLog/' + id,
    method: 'get',
  })
}
