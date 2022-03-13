import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function UserPage() {
  const [userData, setUsetData] = useState(null);
  let [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    fetch(`search?query=${userId}`)
      .then((response) => response.json())
      .then((result) => setUsetData(result[0]))
      .catch((error) => console.log("error", error));
  }

  console.log(userData);
  if (!userData) {
    return null;
  }
  return (
    <div className="App">
      <div>
        <h4>{userData.id}</h4>
        <h2>{userData.name}</h2>
        <h3>
          {userData.address}, {userData.pincode}
        </h3>
        <p>Items Purchased:</p>
        <ul>
          {userData.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
