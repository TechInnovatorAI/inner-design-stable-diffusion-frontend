import { PaintBoard } from 'src/views/utils/paintBoard'
import { CANVAS_ELE_TYPE } from 'src/views/utils/constants'
import { useSpaceEvent } from 'src/hooks/event'
import { CURSOR_TYPE } from 'src/views/utils/cursor'
import { TextEdit } from 'src/views/utils/element/text'

// ** MUI Imports
import { Grid } from '@mui/material'
import ToolPanel from '../paintComponent/toolPanel'
import { useMemo, useState, MouseEvent } from 'react'
import { drawCircle } from 'src/views/utils/element/freeDraw'

const textEdit = new TextEdit()

const EditBoard = ({
  width,
  height,
  inputPath,
  setMaskImage
}: {
  width: number
  height: number
  inputPath: string
  setMaskImage: (string: string) => void
}) => {
  // ** States

  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const [painterWidth, setPainterWidth] = useState<number>(20)
  const board = useMemo(() => {
    console.log('width: ', width, ' height: ', height)
    if (canvasRef) {
      return new PaintBoard(canvasRef, width, height)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, width])

  // 工具类型
  // const [toolType] = useState<string>(CANVAS_ELE_TYPE.FREE_DRAW)
  const [toolType, setToolType] = useState<string>(CANVAS_ELE_TYPE.FREE_DRAW)

  const handleToolType = (type: string) => {
    if (board) {
      if (type !== CANVAS_ELE_TYPE.SELECT) {
        board.select.cancelSelectElement()
      }
      setToolType(type)
      board.render()
    }
  }

  // 是否按下空格
  const isPressSpace = useSpaceEvent(
    () => {
      if (board) {
        board.cursor.change(CURSOR_TYPE.POINTER)
        board.initOriginPosition()
      }
    },
    () => {
      if (board) {
        board.cursor.reset()
      }
    }
  )

  // 监听鼠标事件
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const mouseDown = (event: MouseEvent) => {
    if (board) {
      const { clientX: x, clientY: y } = event
      const position = {
        x,
        y
      }

      // 如果有文本编辑框，取消编辑
      if (textEdit) {
        board.addTextElement(textEdit.value, textEdit.rect)
        textEdit.destroy()
      }
      switch (toolType) {
        case CANVAS_ELE_TYPE.SELECT:
          board.select.clickSelectElement(position)
          break
        case CANVAS_ELE_TYPE.FREE_DRAW:
        case CANVAS_ELE_TYPE.ERASER:
          if (!isPressSpace) {
            board.recordCurrent(toolType)
          }
          break
        default:
          break
      }
      setIsMouseDown(true)
    }
  }
  const dbClick = (event: MouseEvent) => {
    if (board) {
      const { clientX: x, clientY: y } = event
      const position = {
        x,
        y
      }

      // 双击展示文字输入框
      textEdit.showTextInput(position)
    }
  }
  const mouseMove = (event: MouseEvent) => {
    if (board) {
      const { clientX: x, clientY: y } = event

      drawCircle(x, y)
      if (isPressSpace && isMouseDown) {
        board.dragCanvas({
          x,
          y
        })
      } else {
        switch (toolType) {
          case CANVAS_ELE_TYPE.SELECT:
            board.select.moveSelectElement({
              x,
              y
            })
            break
          case CANVAS_ELE_TYPE.FREE_DRAW:
          case CANVAS_ELE_TYPE.ERASER:
            if (isMouseDown) {
              board.currentAddPosition({
                x,
                y
              })
            }
            break
          default:
            break
        }
      }
    }
  }
  const mouseUp = () => {
    if (board) {
      setIsMouseDown(false)
      board.canvasMouseUp()
    }
  }

  // const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
  // const c: CanvasRenderingContext2D | null = canvas?.getContext('2d')

  // // Redraw the circle every time the mouse moves
  // canvas?.addEventListener('mousemove', function (e) {
  //   drawCircle(e.clientX, e.clientY)
  // })

  // canvas?.addEventListener('mouseout', function (e) {
  // c!.clearRect(0, 0, canvas.width, canvas.height)
  // })

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 900px)': {
          height: 'calc(100vh - 270px)'
        }
      }}
    >
      <ToolPanel
        board={board}
        toolType={toolType}
        setMaskImage={setMaskImage}
        setToolType={handleToolType}
        inputPath={inputPath}
        painterWidth={painterWidth}
        setPainterWidth={setPainterWidth}
      />
      <canvas
        ref={setCanvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onDoubleClick={dbClick}
        style={{ zIndex: 2 }}
      ></canvas>
      <img
        src={inputPath}
        alt=''
        style={{ position: 'absolute', zIndex: 1, width: `${width}px`, height: `${height}px` }}
      />
    </Grid>
  )
}

export default EditBoard
