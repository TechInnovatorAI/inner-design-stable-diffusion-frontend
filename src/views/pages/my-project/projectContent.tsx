import { Button, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { ImageList, ImageListItem } from '@mui/material'
import { useEffect, useState, MouseEvent } from 'react'
import { deleteProject, getMyProjectRestyle, getMyProjectStaging } from 'src/pages/api/myProjectService'
import ProjectItemModal from 'src/views/components/projectItemModal'
import { ProjectInterface } from 'src/context/types'
import Icon from 'src/@core/components/icon'
import ConfirmationModal from 'src/views/components/confirmationModal'
import DeleteSuccessModal from 'src/views/components/deleteSuccessModal'
import { timeFormat } from 'src/views/utils/timeFormat'

const ProjectContent = ({ userId }: { userId?: any }) => {
  const method_jp: {
    restyle: string
    staging: string
  } = {
    restyle: 'Re-デザイン',
    staging: 'ステージング'
  }

  const [showState, setShowState] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [deleteProjectId, setDeleteProjectId] = useState<number>(0)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)

  const [myProject, setMyProject] = useState<any>([])
  const [showProject, setShowProject] = useState<boolean>(false)
  const [projectItem, setProjectItem] = useState<ProjectInterface>({
    id: 1,
    name: 'name',
    userId: 2,
    prompt: 'how',
    baseUrl: 'url',
    url: ['1'],
    createdAt: '',
    method: 'restyle'
  })

  const loginuserData = JSON.parse(localStorage.getItem('userData') as string) || null

  const handleShow = (item: ProjectInterface) => {
    setProjectItem(item)
    setShowProject(true)
  }

  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: boolean | null) => {
    if (newAlignment !== null) {
      setShowState(newAlignment)
      console.log(showState)
    }
  }

  const handleDelete = (projectId: number) => {
    setOpenConfirmModal(true)
    setDeleteProjectId(projectId)
  }

  const deleteConfirm = (projectId: number) => {
    const res = deleteProject(projectId)
    res
      .then(({ data }: any) => {
        console.log(data)
        setDeleteSuccess(true)
      })
      .catch(e => {
        console.log(e)
      })
    console.log('delet')
    setReload(!reload)
  }

  // ** Hooks
  useEffect(() => {
    console.log('userId: ', userId)
    if (showState) {
      if (userId) {
        const res = getMyProjectStaging(userId)
        res
          .then(({ data }: any) => {
            setMyProject(data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        const res = getMyProjectStaging(loginuserData.id)
        res
          .then(({ data }: any) => {
            setMyProject(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    } else {
      if (userId) {
        const res = getMyProjectRestyle(userId)
        res
          .then(({ data }: any) => {
            setMyProject(data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        const res = getMyProjectRestyle(loginuserData.id)
        res
          .then(({ data }: any) => {
            setMyProject(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showState, reload])

  return (
    <Grid>
      <ToggleButtonGroup exclusive value={showState} onChange={handleAlignment} aria-label='text alignment' fullWidth>
        <ToggleButton value={false} aria-label='redesign'>
          <Typography sx={{ fontWeight: 500 }}>Re-デザイン</Typography>
        </ToggleButton>
        <ToggleButton value={true} aria-label='staging'>
          <Typography sx={{ fontWeight: 500 }}>ステージングプロ</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <ImageList variant='quilted' cols={5} gap={8}>
        {Array.isArray(myProject) && myProject.length ? (
          myProject.map((item: ProjectInterface, index) => (
            <ImageListItem sx={{}} key={index}>
              <img
                src={`${item.url[0]}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading='lazy'
                style={{ borderRadius: '10px' }}
              />
              <Grid
                sx={{
                  position: 'absolute',
                  top: '0px',
                  zIndex: '1',
                  background: '#00000077',
                  width: '100%',
                  height: '100%',
                  display: 'none',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: 'auto',
                  placeItems: 'center',
                  borderRadius: '10px'
                }}
              >
                <Button
                  onClick={() => handleDelete(item.id)}
                  sx={{ position: 'absolute', bottom: 10, left: '90%', transform: 'translateX(-50%)', p: 0 }}
                >
                  <Icon icon='material-symbols:delete-rounded' fontSize={30} />
                </Button>
                <Button
                  onClick={() => handleShow(item)}
                  sx={{ position: 'absolute', bottom: 10, left: '10%', transform: 'translateX(-50%)', p: 0 }}
                >
                  <Icon icon='material-symbols:visibility-rounded' fontSize={30} />
                </Button>
                <Typography variant='body1'>{method_jp[item.method]}</Typography>
                <Typography variant='body1'>{timeFormat(item.createdAt)}</Typography>
              </Grid>
            </ImageListItem>
          ))
        ) : (
          <Typography variant='h6'>新しいデザインの作成</Typography>
        )}
      </ImageList>
      <ProjectItemModal open={showProject} setOpen={setShowProject} item={projectItem} />
      <ConfirmationModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        deleteProjectId={deleteProjectId}
        confirm={(id: number) => {
          deleteConfirm(id)
        }}
      />
      <DeleteSuccessModal open={deleteSuccess} onClose={setDeleteSuccess} />
    </Grid>
  )
}

export default ProjectContent
