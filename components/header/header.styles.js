export const root = {
  zIndex: 999,
  backgroundColor: 'var(--bg)',
  position: 'fixed',
  top: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5vh 1.0875rem',
  transition: 'background-color 0.5s'
}

export const header = {
  width: '100%',
  maxWidth: 960,
  display: 'flex',
  lineHeight: '40px',
  justifyContent: 'space-between'
}

export const logo = {
  display: 'inline-block',
  verticalAlign: 'middle',
  color: `black`,
  textDecoration: `none`,
  margin: 0,
  filter: 'var(--filter)',
  transition: 'filter 0.5s'
}

export const nav = {
  display: 'flex',
  gap: 'min(20px, max(calc(10vw - 120px), 16px))'
}