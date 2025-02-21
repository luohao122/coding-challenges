import { DataTypes, Model, Optional } from "sequelize";
import slugify from "slugify";
import { sequelize } from "@crud/sqlite-connection/database";
import { IPostDocument } from "@crud/types/post.interface";

type PostCreationAttributes = Optional<
  IPostDocument,
  "id" | "slug" | "coverImage" | "createdAt" | "updatedAt"
>;

/**
 * Class-based Sequelize Model
 */
export class Post
  extends Model<IPostDocument, PostCreationAttributes>
  implements IPostDocument
{
  public id!: number;
  public title!: string;
  public slug!: string;
  public content!: string;
  public coverImage!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Post.init(
  {
    // Primary key
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Post",
    timestamps: true,
    hooks: {
      beforeSave: (post: Post) => {
        if (!post.slug && post.title) {
          post.slug = slugify(post.title, { lower: true, strict: true });
        }
      },
    },
  }
);
