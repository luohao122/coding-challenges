import { Op } from "sequelize";

import { Post } from "@crud/models/post.schema";
import { INewPostDocument, IPostDocument } from "@crud/types/post.interface";

export async function createNewPost(
  postData: INewPostDocument
): Promise<IPostDocument> {
  // Creates a new post record
  const post = await Post.create(postData);
  // Convert the Sequelize model instance to a plain JS object
  return post.get({ plain: true });
}

export async function getPostById(id: string): Promise<IPostDocument | null> {
  // Convert string to number if needed
  const numericId = parseInt(id, 10);

  // Use findByPk instead of findOne({ _id: ... })
  const post = await Post.findByPk(numericId);
  if (!post) {
    return null;
  }
  return post.get({ plain: true });
}

interface PaginationParams {
  page: number; // The current page number (1-based index)
  limit: number; // Number of posts per page
  filterTitle?: string; // allows searching for posts whose title partially matches the provided string.
  orderBy?: string;
  sortDirection?: "ASC" | "DESC"; // default to "DESC"
}

export async function getAllPosts({
  page,
  limit,
  filterTitle,
  orderBy = "createdAt",
  sortDirection = "DESC",
}: PaginationParams) {
  const offset = (page - 1) * limit;

  // Build a dynamic 'where' clause
  const whereClause: Record<string, any> = {};

  // If filterTitle is provided, use a LIKE query for partial match
  if (filterTitle) {
    whereClause.title = {
      [Op.like]: `%${filterTitle}%`, 
    };
  }

  // Use findAndCountAll to get records + total count
  const { rows, count } = await Post.findAndCountAll({
    where: whereClause,
    // For ordering:
    order: [[orderBy, sortDirection]],
    limit,
    offset,
  });

  return {
    results: rows.map((post) => post.get({ plain: true })),
    totalCount: count,
  };
}

export async function removePost(id: string) {
  const numericId = parseInt(id, 10);
  // destroy removes records by criteria
  const deletedCount = await Post.destroy({
    where: { id: numericId },
  });
  return deletedCount; // number of records deleted
}

export async function updatePost(
  id: string,
  postData: Partial<INewPostDocument>
) {
  const numericId = parseInt(id, 10);

  const [count] = await Post.update(
    {
      title: postData.title,
      content: postData.content,
      slug: postData.slug,
      coverImage: postData.coverImage,
    },
    {
      where: { id: numericId },
    }
  );

  return count;
}
