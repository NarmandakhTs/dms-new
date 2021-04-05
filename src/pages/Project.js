import { Header } from './../layouts/App'

function Project() {
  return (
    <Header
      title="Цаг захиалгын систем"
      breadcrumbs={[
        { label: 'App', to: '/' },
        { label: 'Projects' },
        { label: 'Цаг захиалгын систем' },
      ]}
    />
  )
}

export default Project