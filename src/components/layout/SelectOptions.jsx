import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectOptions = ({ sortBy, setSortBy, order, setSortOrder }) => {
  const handleOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section className="select-container">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSort} label="Sort By">
          <MenuItem value="votes">Upvotes</MenuItem>
          <MenuItem value="comment_count">Comments</MenuItem>
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel>Order By</InputLabel>
        <Select value={order} onChange={handleOrder} label="Order By">
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
};
export default SelectOptions;
