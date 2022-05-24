import { ProjectCard, ProjectPreview } from '@ts/types/app';
import { MDXProjectMeta } from '@ts/types/mdx';
import { readdirSync } from 'fs';
import path from 'path';

/**
 * Retrieve all the projects filename.
 *
 * @returns {string[]} An array of filenames.
 */
export const getProjectFilenames = (): string[] => {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = readdirSync(projectsDirectory);

  return filenames.map((filename) => filename.replace(/\.mdx$/, ''));
};

/**
 * Retrieve the data of a project by filename.
 *
 * @param {string} filename - The project filename.
 * @returns {Promise<ProjectPreview>}
 */
export const getProjectData = async (
  filename: string
): Promise<ProjectPreview> => {
  try {
    const {
      meta,
    }: {
      meta: MDXProjectMeta;
    } = await import(`../../content/projects/${filename}.mdx`);

    const { dates, intro, title, ...projectMeta } = meta;
    const { publication, update } = dates;
    const cover = await import(`../../../public/projects/${filename}.jpg`);

    return {
      id: filename,
      intro,
      meta: {
        ...projectMeta,
        dates: { publication, update },
        // Dynamic import source does not work so I use it only to get sizes
        cover: {
          ...cover.default,
          alt: `${title} image`,
          src: `/projects/${filename}.jpg`,
        },
      },
      slug: filename,
      title: title,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Retrieve all the projects data using filenames.
 *
 * @param {string[]} filenames - The filenames without extension.
 * @returns {Promise<ProjectCard[]>} - An array of projects data.
 */
export const getProjectsData = async (
  filenames: string[]
): Promise<ProjectCard[]> => {
  return Promise.all(
    filenames.map(async (filename) => {
      const { id, meta, slug, title } = await getProjectData(filename);
      const { cover, dates, tagline, technologies } = meta;
      return { id, meta: { cover, dates, tagline, technologies }, slug, title };
    })
  );
};

/**
 * Method to sort an array of projects by publication date.
 *
 * @param {ProjectCard} a - A single project.
 * @param {ProjectCard} b - A single project.
 * @returns The result used by Array.sort() method: 1 || -1 || 0.
 */
const sortProjectsByPublicationDate = (a: ProjectCard, b: ProjectCard) => {
  if (a.meta.dates.publication < b.meta.dates.publication) return 1;
  if (a.meta.dates.publication > b.meta.dates.publication) return -1;
  return 0;
};

/**
 * Retrieve all projects in content folder sorted by publication date.
 *
 * @returns {Promise<ProjectCard[]>} An array of projects.
 */
export const getProjectsCard = async (): Promise<ProjectCard[]> => {
  const filenames = getProjectFilenames();
  const projects = await getProjectsData(filenames);

  return [...projects].sort(sortProjectsByPublicationDate);
};
