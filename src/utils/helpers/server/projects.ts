import { readdir } from 'fs/promises';
import { join } from 'path';
import type { StaticImageData } from 'next/image';
import type { MDXProjectMeta, Project, ProjectPreview } from '../../../types';
import { ROUTES } from '../../constants';

/**
 * Retrieve all the projects filename.
 *
 * @returns {Promise<string[]>} An array of filenames.
 */
export const getProjectFilenames = async (): Promise<string[]> => {
  const projectsDir = join(process.cwd(), 'src/content/projects');
  const filenames = await readdir(projectsDir);

  return filenames.map((filename) => filename.replace(/\.mdx$/, ''));
};

/**
 * Retrieve the data of a project by filename.
 *
 * @param {string} filename - The project filename.
 * @returns {Promise<ProjectPreview>} A ProjectPreview object.
 */
export const getProjectData = async (filename: string): Promise<Project> => {
  try {
    const {
      meta,
    }: {
      meta: MDXProjectMeta;
    } = await import(`../../../content/projects/${filename}.mdx`);

    const { intro, title, ...projectMeta } = meta;
    const cover: StaticImageData = (
      await import(`../../../../public/projects/${filename}.jpg`)
    ).default;

    return {
      id: filename,
      intro,
      meta: {
        ...projectMeta,
        // Dynamic import source does not work so I use it only to get sizes
        cover: {
          alt: `${title} image`,
          height: cover.height,
          src: `/projects/${filename}.jpg`,
          width: cover.width,
          title,
        },
      },
      slug: `${ROUTES.PROJECTS}/${filename}`,
      title,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Method to sort an array of projects by publication date.
 *
 * @param {ProjectPreview} a - A single project.
 * @param {ProjectPreview} b - A single project.
 * @returns {number} The result used by Array.sort() method: 1 || -1 || 0.
 */
const byPublicationDate = (a: ProjectPreview, b: ProjectPreview) => {
  if (a.meta.dates.publication < b.meta.dates.publication) return 1;
  if (a.meta.dates.publication > b.meta.dates.publication) return -1;
  return 0;
};

/**
 * Retrieve all projects in content folder sorted by publication date.
 *
 * @returns {Promise<ProjectPreview[]>} An array of projects.
 */
export const getAllProjects = async (): Promise<ProjectPreview[]> => {
  const filenames = await getProjectFilenames();
  const projects = await Promise.all(filenames.map(getProjectData));

  return [...projects].sort(byPublicationDate);
};
