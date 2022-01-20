import { Project, ProjectMeta } from '@ts/types/app';
import { readdirSync } from 'fs';
import path from 'path';

/**
 * Retrieve the projects data from filenames.
 * @param {string[]} filenames - An array of filenames.
 * @returns {Promise<Project[]>} An array of projects.
 */
const getProjectsWithMeta = async (filenames: string[]): Promise<Project[]> => {
  return Promise.all(
    filenames.map(async (filename) => {
      const id = filename.replace(/\.mdx$/, '');

      try {
        const {
          image,
          intro,
          meta,
        }: { image: string; intro: string; meta: ProjectMeta } = await import(
          `../../content/projects/${filename}`
        );

        const projectMeta: ProjectMeta = meta
          ? meta
          : {
              title: '',
              publishedOn: '',
              updatedOn: '',
              license: '',
            };
        const projectIntro = intro ? intro : '';
        const projectCover = image ? image : '';

        return {
          id,
          cover: projectCover,
          intro: projectIntro,
          meta: projectMeta,
          slug: id,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
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
 * Retrieve all projects in content folder sorted by publication date.
 * @returns {Promise<Project[]>} An array of projects.
 */
export const getSortedProjects = async (): Promise<Project[]> => {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = readdirSync(projectsDirectory);
  const projects = await getProjectsWithMeta(filenames);

  return [...projects].sort(sortProjectByPublicationDate);
};
