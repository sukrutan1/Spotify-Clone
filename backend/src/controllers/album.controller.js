import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("error in get all albums");
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    console.log("error in get album by id");
    next(error);
  }
};
