import { Project, ProjectMeta } from '@ts/types/app';
import { readdirSync } from 'fs';
import path from 'path';

/**
 * Retrieve project's data by id.
 * @param {string} id - The filename without extension.
 * @returns {Promise<Project>} - The project data.
 */
export const getProjectData = async (id: string): Promise<Project> => {
  try {
    const {
      image,
      intro,
      meta,
      seo,
    }: {
      image: string;
      intro: string;
      meta: ProjectMeta & { title: string };
      seo: { title: string; description: string };
    } = await import(`../../content/projects/${id}.mdx`);

    const { title, ...onlyMeta } = meta;

    return {
      id,
      cover: image || '',
      intro: intro || '',
      meta: onlyMeta || {},
      slug: id,
      title,
      seo: seo || {},
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Retrieve the projects data from filenames.
 * @param {string[]} filenames - An array of filenames.
 * @returns {Promise<Project[]>} An array of projects with meta.
 */
const getProjectsWithMeta = async (filenames: string[]): Promise<Project[]> => {
  return Promise.all(
    filenames.map(async (filename) => {
      return getProjectData(filename);
    })
  );
};

/**
 * Method to sort an array of projects by publication date.
 * @param {Project} a - A single project.
 * @param {Project} b - A single project.
 * @returns The result used by Array.sort() method: 1 || -1 || 0.
 */
const sortProjectByPublicationDate = (a: Project, b: Project) => {
  if (a.meta.publishedOn < b.meta.publishedOn) return 1;
  if (a.meta.publishedOn > b.meta.publishedOn) return -1;
  return 0;
};

/**
 * Retrieve all the projects filename.
 * @returns {string[]} An array of filenames.
 */
export const getAllProjectsFilename = (): string[] => {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = readdirSync(projectsDirectory);

  return filenames.map((filename) => filename.replace(/\.mdx$/, ''));
};

/**
 * Retrieve all projects in content folder sorted by publication date.
 * @returns {Promise<Project[]>} An array of projects.
 */
export const getSortedProjects = async (): Promise<Project[]> => {
  const filenames = getAllProjectsFilename();
  const projects = await getProjectsWithMeta(filenames);

  return [...projects].sort(sortProjectByPublicationDate);
};
