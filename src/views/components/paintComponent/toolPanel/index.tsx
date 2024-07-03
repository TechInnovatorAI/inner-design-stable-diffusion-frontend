import React, { useState, useEffect, MouseEvent } from 'react'
import { CANVAS_ELE_TYPE } from 'src/views/utils/constants'
import { PaintBoard } from 'src/views/utils/paintBoard'
import UndoIcon from '../icons/undo'
import RedoIcon from '../icons/redo'
import SaveIcon from '../icons/save'
import CleanIcon from '../icons/clean'
import CloseIcon from '../icons/close'
import MenuIcon from '../icons/menu'

import { toast } from 'react-hot-toast'

// MUI Components
import { Grid, Card, Typography, Slider, ToggleButton, ToggleButtonGroup, Box, Avatar } from '@mui/material'

interface IProps {
  board: PaintBoard | undefined // 画板
  toolType: string // 操作类型
  setMaskImage: (any: any) => void
  setToolType: (type: string) => void // 修改操作类型
  inputPath: string
  painterWidth: number
  setPainterWidth: (number: number) => void
}

/**
 * 操作面板
 */
const ToolPanel: React.FC<IProps> = ({
  board,
  toolType,
  setMaskImage,
  setToolType,
  inputPath,
  painterWidth,
  setPainterWidth
}) => {
  const [, setRefresh] = useState(0) // 刷新数据
  const [showPanel, setShowPanel] = useState(true) // 面板展示控制
  const [drawState, setDrawState] = useState(true)
  const [save, setSave] = useState(false)

  // 点击后退
  const undo = () => {
    if (board) {
      board.undo()
      setSave(false)
    }
  }

  // 点击前进
  const redo = () => {
    if (board) {
      board.redo()
      setSave(false)
    }
  }

  // 清除画布
  const clean = () => {
    if (board) {
      board.clean()
      setSave(false)
    }
  }

  // 保存图片
  const notify = () =>
    toast(
      () => (
        <Box
          padding={1}
          sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 9999 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar alt='Victor Anderson' src='/images/tool/saveBanner.png' sx={{ mr: 3, width: 30, height: 30 }} />
            <Grid>
              <Typography
                padding={1}
                variant='body1'
                sx={{ fontWeight: 800, display: 'flex', justifyContent: 'center' }}
              >
                保存しました
              </Typography>
              <Typography
                padding={1}
                variant='body1'
                sx={{ fontWeight: 800, display: 'flex', justifyContent: 'center' }}
              >
                マスクツールの編集が可能です。
              </Typography>
            </Grid>
          </Box>
        </Box>
      ),
      {
        position: 'top-center',
        style: {
          minWidth: '300px',
          border: '1px solid grey'
        }
      }
    )

  const saveImage = () => {
    if (board) {
      const drawImage = board.saveImage()
      drawImage
        .then(resolve => {
          console.log('resolve', resolve)
          setMaskImage(resolve)
          notify()
          setSave(true)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  // 改变宽度
  const setWidth = (w: number) => {
    setSave(false)
    if (board) {
      switch (toolType) {
        case CANVAS_ELE_TYPE.FREE_DRAW:
          board.setFreeDrawWidth(w)
          break
        case CANVAS_ELE_TYPE.ERASER:
          board.setCleanWidth(w)
          break
        default:
          break
      }
      setRefresh(v => v + 1)
    }
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSave(false)
    setPainterWidth(newValue as number)
    setWidth(newValue as number)
  }

  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: boolean | null) => {
    setSave(false)
    if (newAlignment !== null) {
      setDrawState(newAlignment)
      console.log(drawState)
    }
  }

  useEffect(() => {
    clean()
    setSave(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPath])

  return (
    <Grid>
      <Card
        sx={{
          position: 'fixed',
          top: 90,
          right: 25,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 2,
          overflow: 'visible',
          p: 2,
          zIndex: 3
        }}
        style={{ backgroundColor: `${showPanel ? '#000000' : '#787eff'}` }}
      >
        {/* 控制面板显示 */}
        <label style={{ display: 'flex', justifyContent: 'end' }}>
          <input type='checkbox' hidden onChange={() => setShowPanel(v => !v)} />
          {showPanel ? <CloseIcon /> : <MenuIcon />}
        </label>
        {showPanel && (
          <>
            {/* 类型切换 */}
            <div className='btn-group flex' style={{ paddingTop: '10px' }}>
              <ToggleButtonGroup
                exclusive
                value={drawState}
                onChange={handleAlignment}
                aria-label='text alignment'
                fullWidth
              >
                <ToggleButton
                  value={true}
                  aria-label='draw'
                  onClick={() => setToolType(CANVAS_ELE_TYPE.FREE_DRAW)}
                  fullWidth
                >
                  <Typography sx={{ fontWeight: 500 }} width={70}>
                    マスク
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value={false}
                  aria-label='eraser'
                  onClick={() => setToolType(CANVAS_ELE_TYPE.ERASER)}
                  fullWidth
                >
                  <Typography sx={{ fontWeight: 500 }} width={70}>
                    消しゴム
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            {/* 宽度设置 */}
            {(toolType === CANVAS_ELE_TYPE.FREE_DRAW || toolType === CANVAS_ELE_TYPE.ERASER) && (
              <Grid sx={{ mt: 4 }}>
                <Typography sx={{ fontWeight: 500, pb: 2 }}>ブラシサイズ</Typography>
                <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Slider
                    min={1}
                    max={100}
                    value={typeof painterWidth === 'number' ? painterWidth : 0}
                    onChange={handleSliderChange}
                    aria-labelledby='input-slider'
                    valueLabelDisplay='auto'
                    color={'secondary'}
                  />
                </Grid>
              </Grid>
            )}
            {/* 操作画板 */}
            <Grid sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 500, pb: 2 }}>ツール</Typography>
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card onClick={undo} sx={{ padding: 2, cursor: 'pointer' }}>
                  <UndoIcon />
                </Card>
                <Card onClick={redo} sx={{ padding: 2, cursor: 'pointer' }}>
                  <RedoIcon />
                </Card>
                <Card onClick={clean} sx={{ padding: 2, cursor: 'pointer' }}>
                  <CleanIcon />
                </Card>
                <Card
                  onClick={saveImage}
                  sx={{ padding: 2, cursor: 'pointer' }}
                  style={save ? { border: '2px #00ffff solid' } : {}}
                >
                  <SaveIcon />
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </Grid>
  )
}

export default ToolPanel
