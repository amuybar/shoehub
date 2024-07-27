const { createClient } = require("@sanity/client");
const { createReadStream } = require("fs")
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const shoesData = require("./shoe.json");

interface Shoe {
  id: number;
  title: string;
  description: string;
  brand: string;
  gender: string;
  category: string;
  price: number;
  is_in_inventory: boolean;
  items_left: number;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  slug: {
    _type: string;
    current: string;
  };
}

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.PROJECT_ID || "b7k3bebw",
  dataset: "production",
  apiVersion: "2024-07-01",
  useCdn: false,
  token:
    process.env.SANITY_TOKEN ||
    "skyuk7pSuWDki2GMStraoCow3Ak1PhIA327zJQxwX3ZUXmb2bSn7ImtLENLiLs2f1gTuEPE1AX2Ptsrs44tVG3bu8V1RZACveuAs5SkndHQOw3SqtDheb4nnn6Nh1EJshutzyKgljJJPvGYmJdA7oT4Qi4dBbdy3A2LHfKFUocXsgPjjvlLJ",
});

console.log(
  "Token:",
  process.env.SANITY_TOKEN ? "Token is set" : "Token is not set"
);

// Function to convert JSON object to array of Shoe objects
const convertObjectToArray = (
  data: Record<string, any>
): Array<Partial<Shoe>> => {
  return Object.keys(data).map((key) => {
    const shoe = data[key];
    return {
      id: shoe.id,
      title: shoe.name,
      description: "", // You might want to add a description field to your JSON data
      price: shoe.price,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: `image-${path.basename(shoe.imageURL)}`,
        },
      },
      category: shoe.category,
      brand: shoe.brand,
      gender: shoe.gender,
      is_in_inventory: shoe.is_in_inventory,
      items_left: shoe.items_left,
      slug: {
        _type: "slug",
        current: shoe.slug,
      },
    };
  });
};

// Convert the JSON object to an array
const shoesArray = convertObjectToArray(shoesData);

const pushShoesToSanity = async (shoes: Array<Partial<Shoe>>) => {
  try {
    for (const shoe of shoes) {
      // Upload image
      const imagePath = path.join(
        __dirname,
        "..",
        "public/assets",
        shoe.image!.asset._ref.replace("image-", "")
      );
      const imageAsset = await client.assets.upload(
        "image",
        createReadStream(imagePath),
        {
          filename: path.basename(imagePath),
        }
      );

      // Update shoe object with the uploaded image asset
      shoe.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };

      // Create or update the shoe document
      await client.createOrReplace({
        _type: "shoe",
        _id: `shoe-${shoe.id}`,
        ...shoe,
      });
    }

    console.log("Shoes have been successfully pushed to Sanity!");
  } catch (error) {
    console.error("Failed to push shoes to Sanity:", error);
  }
};

// Convert and push data
pushShoesToSanity(shoesArray).catch((err) => console.error("Error:", err));
