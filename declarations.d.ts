declare module '*.scss'
declare module '@mui/material/styles' {
  type Theme = {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  type ThemeOptions = {
    status?: {
      danger?: string
    }
  }
}
