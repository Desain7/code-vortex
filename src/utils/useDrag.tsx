import { SetStateAction, useEffect, useState } from 'react'
/*
 * @drag: 添加拖拽事件的元素（支持传入元素的dragger，id，class等）必填参数
 * @draggerBox: 被拖拽的整体元素（支持传入元素的dragger，id，class等）可选参数
 * @container: 可拖拽的区域（支持传入元素的dragger，id，class等）可选参数
 * @margin: 离外部元素的间隔 可选参数
 */

type DraggerType = HTMLElement | string

interface MouseEvent {
  clientX: number
  clientY: number
}

interface UseDragOptions {
  dragger: DraggerType
  draggerBox?: DraggerType
  container?: Element | string
  margin?: [number, number, number, number]
}

export default function useDrag({
  dragger,
  draggerBox = dragger,
  container = document.body,
  margin = [0, 0, 0, 0]
}: UseDragOptions) {
  const [translateX, setTranslateX] = useState(0) // 水平方向偏移量
  const [translateY, setTranslateY] = useState(0) // 垂直方向偏移量

  useEffect(() => {
    if (!dragger) return
    if (!draggerBox) return
    if (!container) return
    dragger =
      typeof dragger === 'string'
        ? (document.querySelector(dragger) as unknown as HTMLElement)
        : dragger // 根据传入的值类型，去查找使用元素
    draggerBox =
      typeof draggerBox === 'string'
        ? (document.querySelector(draggerBox) as unknown as HTMLElement)
        : draggerBox
    container =
      typeof container === 'string'
        ? (document.querySelector(container) as Element)
        : container

    const {
      left: containerL,
      top: containerT,
      right: containerR,
      bottom: containerB
    } = container.getBoundingClientRect() // 获取可拖拽区域边界位置

    const onMouseDown = (event: MouseEvent) => {
      const initMouseX = event.clientX // 元素初始水平坐标值
      const initMouseY = event.clientY // 元素初始垂直坐标
      let box: DOMRect = new DOMRect(0, 0, 0, 0)
      if (typeof draggerBox != 'string') {
        box = draggerBox.getBoundingClientRect()
      }
      const { left: boxL, top: boxT, right: boxR, bottom: boxB } = box // 获取拖拽实体的位置

      let deltaMouseX: SetStateAction<number> // 实际水平偏移量
      let deltaMouseY: SetStateAction<number> // 实际垂直增量值

      const onMouseMove = (event: MouseEvent) => {
        const moveMouseX = event.clientX // 元素移动后水平坐标值
        const moveMouseY = event.clientY // 元素移动后垂直坐标值

        let deltaX = moveMouseX - initMouseX // 当前移动水平相对移动距离
        let deltaY = moveMouseY - initMouseY // 当前移动垂直相对移动距离

        if (boxL + deltaX < containerL + margin[0]) {
          // 当元素左边框+水平相对移动距离 < 可拖拽区域左边界+左边距时 （说明元素已经超出左侧边界）

          deltaX = containerL + margin[0] - boxL
        }

        if (boxR + deltaX > containerR - margin[1]) {
          // 当元素右边框+水平相对移动距离 > 可拖拽区域右边界+右边距时 （说明元素已经超出右侧边界）
          deltaX = containerR - margin[1] - boxR
        }

        if (boxB + deltaY > containerB - margin[2]) {
          // 当元素下边框+垂直相对移动距离 > 可拖拽区域下边界+下边距时 （说明元素已经超出下侧边界）
          deltaY = containerB - margin[2] - boxB
        }

        if (boxT + deltaY < containerT + margin[3]) {
          // 当元素上边框+垂直相对移动距离 < 可拖拽区域上边界+上边距时 （说明元素已经超出上侧边界）
          deltaY = containerT + margin[3] - boxT
        }

        deltaMouseX = deltaX + translateX // 实际水平偏移量
        deltaMouseY = deltaY + translateY // 实际垂直偏移量
        if (typeof draggerBox != 'string')
          draggerBox.style.transform = `translate(${deltaMouseX}px, ${deltaMouseY}px)`
      }

      const onMouseUp = () => {
        setTranslateX(deltaMouseX) // 保存上次水平偏移量
        setTranslateY(deltaMouseY) // 保存上次垂直偏移量
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }
    dragger.addEventListener('mousedown', onMouseDown)

    return () => {
      if (typeof dragger !== 'string')
        return dragger.removeEventListener('mouseup', onMouseDown)
    }
  }, [dragger, draggerBox, container, margin])
}
