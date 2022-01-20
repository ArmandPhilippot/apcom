import ProjectPreview from '@components/ProjectPreview/ProjectPreview';
import { Project } from '@ts/types/app';
import styles from './ProjectsList.module.scss';

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const getProjectItems = () => {
    return projects.map((project) => {
      return project.title ? (
        <li className={styles.item} key={project.id}>
          <ProjectPreview project={project} />
        </li>
      ) : (
        ''
      );
    });
  };

  return <ul className={styles.list}>{getProjectItems()}</ul>;
};

export default ProjectsList;
