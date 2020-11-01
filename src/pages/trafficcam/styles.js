import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex'
  },
  leftContainer: {
    display: 'felx',
    width: '70%'
  },
  locationContainer: {
    padding: '20px'
  },
  paperRoot: {
    width: '70%'
  },
  cardRoot: {
    minWidth: 275
  },
  cameraRoot: {
    maxWidth: 345
  },
  cameraMedia: {
    minHeight: '480px',
    maxWidth: '100%'
  },
  weatherRoot: {
    display: 'flex'
  },
  weatherDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  weatherContent: {
    flex: '1 0 auto'
  },
  weatherMedia: {
    display: 'block',
    margin: '0 auto'
  },
  weatherIcon: {
    display: 'block',
    margin: '0 auto',
    color: '#22a6b3'
  },
  avatar: {
    backgroundColor: '#ff7675'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  gridRoot: {
    flexGrow: 1
  },
  tableContainer: {
    maxHeight: 240
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default useStyles;
