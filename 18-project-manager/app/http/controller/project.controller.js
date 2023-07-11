const { projectModel } = require("../../model/project");
const autoBind = require("auto-bind");
const { createLinkForFiles } = require("../../module/functions");
class ProjectController {
  constructor() {
    autoBind(this);
  }
  async findProject(projectId, owner) {
    const project = await projectModel.findOne({
      owner,
      _id: projectId,
    });

    if (!project)
      throw {
        status: 400,
        message: "No project were found",
      };

    return project;
  }
  async createProject(req, res, next) {
    try {
      const { title, text, image, tags } = req.body;

      const { _id } = req.user;
      const result = await projectModel.create({
        title,
        text,
        owner: _id,
        image: image.replace(/\\/g, "/"),
        tags,
      });
      if (!result)
        throw {
          status: 400,
          message: "we couldn't make your project.please try again!",
        };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "project is ready to use",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProject(req, res, next) {
    try {
      const { _id } = req.user;
      const projects = await projectModel.find({ owner: _id });
      for (const project of projects) {
        project.image = createLinkForFiles(req, project.image);
      }
      return res.status(200).json({
        status: 200,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProjectById(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: projectId } = req.params;

      const project = await this.findProject(projectId, owner);
      project.image = createLinkForFiles(req, project.image);
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: projectId } = req.params;

      const project = await this.findProject(projectId, owner);
      const deleteProjectResult = await projectModel.deleteOne({
        _id: project._id,
      });
      if (deleteProjectResult.deletedCount == 0)
        throw {
          status: 400,
          message: "we couldnt delete your project",
        };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProject(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: projectId } = req.params;
      let data = { ...req.body };

      const project = await this.findProject(projectId, owner);

      const fields = ["title", "text", "tags"];

      Object.keys(data).forEach((key) => {
        if (!fields.includes(key)) delete data[key];
      });
      if (Object.keys(data).length === 0)
        throw {
          status: 400,
          message: "select an option to update",
        };
      const updateResult = await projectModel.updateOne(
        { _id: projectId },
        { $set: data }
      );
      if (updateResult.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile updated successfully",
        });
      }
      throw {
        status: 400,
        message: "somthing is wrong in your update request",
      };
    } catch (error) {
      next(error);
    }
  }
  async updateProjectImage(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: projectId } = req.params;
      const { image } = req.body;

      await this.findProject(projectId, owner);
      console.log(image);

      const updateResult = await projectModel.updateOne(
        { _id: projectId },
        { $set: { image: image.replace(/\\/g, "/") } }
      );

      if (updateResult.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile image updated successfully",
        });
      }
      throw {
        status: 400,
        message: "somthing is wrong in your update request",
      };
    } catch (error) {
      next(error);
    }
  }
  getProjectOfTeam() {}
}
module.exports = { ProjectController: new ProjectController() };
