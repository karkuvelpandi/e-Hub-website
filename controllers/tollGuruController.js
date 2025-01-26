import fetch from "node-fetch";

const tollGuruAPI = async (req, res) => {
  const apiKey = process.env.xApiKey;
  try {
    const response = await fetch(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(200).json({
      result: "Data successfully fetched...",
      tollData: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch toll data" });
  }
};

export default tollGuruAPI;
