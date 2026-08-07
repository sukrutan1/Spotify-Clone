import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempfilepath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("error uploading to cloudinary");
    throw new Error("error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .json({ message: "Please upload all required files." });
    }

    const { title, albumId, artist, duration } = req.body;
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    const audioUrl = uploadToCloudinary(audiofile);
    const imageUrl = uploadToCloudinary(imagefile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    return res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.log("Error in create song");
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const songId = req.params.id;

    if (!songId) {
      return res.status(400).json({ message: "song not found" });
    }

    await Song.findByIdAndDelete(songId);
    await Album.findOneAndUpdate(
      { songs: songId },
      { $pull: { songs: songId } },
    );
  } catch (error) {
    console.log("Error in delete song");
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = uploadToCloudinary(imageFile);

    if (!title || !artist || !releaseYear || !imageFile) {
      return res
        .status(400)
        .json({ message: "please upload all required files" });
    }
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();
    return res
      .status(201)
      .json({ message: "Album created successfully", album });
  } catch (error) {
    console.log("error in creating album");
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.id;

    if (!albumId) {
      return res.status(400).json({ message: "album not found" });
    }
    await Song.deleteMany({ albumId: albumId });
    await Album.findByIdAndDelete(albumId);
    return res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("error in deleting album");
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  return res.status(200).json({ admin: true });
};
