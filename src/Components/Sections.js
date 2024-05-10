import { connect } from "react-redux";
import TableComponent from "../TableComponent";
import CreateTable from "./CreateATable";

const Sections = ({ section }) => {
  switch (section) {
    case "Create Table":
      return <CreateTable />;
    default:
      return <TableComponent />;
  }
};
const mapStateToProps = (state) => {
  return {
    section: state.section,
  };
};
export default connect(mapStateToProps, {})(Sections);
