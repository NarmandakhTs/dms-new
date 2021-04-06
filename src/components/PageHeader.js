import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link
} from '@material-ui/core'

function PageHeader({
  title,
  breadcrumbs,
  actions
}) {
  return (
    <Box mb={3}>
      <Grid
        container
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h5">
            <Box fontWeight="fontWeightMedium">
              {title}
            </Box>
          </Typography>
          <Box mt={1}>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, i) => breadcrumb.to ? (
                <Link
                  key={i}
                  to={breadcrumb.to}
                  component={Link}
                  color="primary"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <Typography
                  key={i}
                  color="textSecondary"
                >
                  {breadcrumb.label}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>
        </Grid>
        <Grid item>
          {actions}
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageHeader