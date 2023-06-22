import mongoose from "mongoose";

// create Breed Post model

const postSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
      },

      photo: {
        data: Buffer,
        contentType: String,
      },
      
    },
    { timestamps: true }
  );
  
  export default mongoose.model("posts", postSchema);