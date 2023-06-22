
import userPostModel from "../models/userPostModel.js";
import slugify from "slugify";
import fs from "fs";
 
import {hashPassword, comparePassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken"

// create breeding post
export const createBreedPostController = async (req, res) => {

    try {
      const { name, description, status } =
        req.fields;
      const { photo } = req.files;
  
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        //case !status:
          //return res.status(500).send({ error: "Status is Required" });
  
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const posts = new userPostModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        posts.photo.data = fs.readFileSync(photo.path);
        posts.photo.contentType = photo.type;
      }
      await posts.save();
      res.status(201).send({
        success: true,
        message: "Post Created Successfully",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating post",
      });
    }
  
  }
  
  
  //get all bredd request post
  export const getAllBreedPostController = async (req, res) => {
 
  
    try {
      const posts = await userPostModel
        .find({})
        //.populate("posts")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        countTotal: posts.length,
        message: "ALL Posts ",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  
  
  // get Post Photo
  export const postPhotoController = async (req, res) => {
    try {
      const posts = await userPostModel.findById(req.params.pid).select("photo");
      if (posts.photo.data) {
        res.set("Content-type", posts.photo.contentType);
        return res.status(200).send(posts.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  
  
  // post count
  export const postCountController = async (req, res) => {
    try {
      const total = await userPostModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in post count",
        error,
        success: false,
      });
    }
  };
  
  // product list base on page
  export const postListController = async (req, res) => {
    try {
      const perPage = 3;
      const page = req.params.page ? req.params.page : 1;
      const posts = await userPostModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  
  
  
  
  
  
  //post status update
  export const postStatusController = async (req, res) => {
    try {
      const { postId } = req.params;
      const { status } = req.body;
      const posts = await userPostModel.findByIdAndUpdate(
        postId,
        { status },
        { new: true }
      ); 
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };