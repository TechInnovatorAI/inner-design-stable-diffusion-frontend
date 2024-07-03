import Alert from '@mui/material/Alert'

import AlertTitle from '@mui/material/AlertTitle'

const AlertsDescription = (title: string, text: string, state: string) => {
  if (state == 'success') {
    return (
      <Alert severity='success'>
        <AlertTitle>{title}</AlertTitle>
        {text} <strong>チェックしてください！</strong>
      </Alert>
    )
  } else if (state == 'info') {
    return (
      <Alert severity='info'>
        <AlertTitle>{title}</AlertTitle>
        {text} <strong>チェックしてください！</strong>
      </Alert>
    )
  } else if (state == 'warning') {
    return (
      <Alert severity='warning'>
        <AlertTitle>{title}</AlertTitle>
        {text} <strong>チェックしてください！</strong>
      </Alert>
    )
  } else if (state == 'error') {
    return (
      <Alert severity='error'>
        <AlertTitle>{title}</AlertTitle>
        {text} <strong>チェックしてください！</strong>
      </Alert>
    )
  }
}

export default AlertsDescription
