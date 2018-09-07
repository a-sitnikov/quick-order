import { createMuiTheme } from '@material-ui/core'

const MuiAppBar = {
  root: {
    flexDirection: "row"
  }
}

const MuiTableRow = {
  root: {
    height: 36,
    '&$selected': {
      backgroundColor: "#f3ef97"
    }
  },
  head: {
    height: 36,
    fontWeight: "bold",
    backgroundColor: "#e0e0e0"
  },
}

const MuiTableCell = {
  footer: {
    color: "black",
    fontSize: "1rem"
  }
}

const MuiListSubheader = {
  root:{
    lineHeight: "36px",
    color: "black",
    fontSize: "0.8125rem"
  }
}

const MuiListItem = {
  root: {
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: "0.8125rem"
  }
}

const MuiChip = {
  root: {
    height: "24px",
    margin: 2
  },
  deleteIcon: {
    fontSize: "16px"
  }
}

const MuiCheckbox = {
  root: {
    height: 36,
    width: 36
  }
}

const theme = {
  overrides: {
    MuiAppBar,
    MuiTableRow,
    MuiTableCell,
    MuiListSubheader,
    MuiListItem,
    MuiChip,
    MuiCheckbox
  }
}

export default createMuiTheme(theme);