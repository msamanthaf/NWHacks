"use server";

export default async function getLocation(input: string) {
  const locationResponse = await fetch(
    `https://us-central1-recipict-gcp.cloudfunctions.net/function-nwhacks?input=${input}`
  );

  const locationResponseJSON = await locationResponse.json();

  let str = locationResponseJSON.output;
  let arr = str.split(/,\s*/);

  console.log("from getLocation.ts", arr);

  return { from: arr[0], destination: arr[1] };
}
