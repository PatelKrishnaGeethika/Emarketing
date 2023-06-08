import { useAxios } from "../../utils/useAxios";
import Loading from "./Loading";
/**
 * A component that takes a component as child and loads the component or displays the loading page
 * This component fetches the data, displays the loading page and then calls the child prop when data is recieved
 * @param url the url for the API call
 * @param child The component to which the fetched data should be given to for rendering
 */
export default function DisplayData({ url, Child, ...rest }) {
  const { apidata, loading, error } = useAxios(url);
  if (error) console.log("Failed to fetch Data from " + url);
  return (
    <div className="display-data">
      {loading && <Loading />}
      {apidata && <Child data={apidata} {...rest} />}
    </div>
  );
}
