import { TooltipProps } from '../modals/tooltip';
import { Help } from '../modals/tooltip.stories';

export const body = 'doloribus magni aut';
export const legend = 'maiores autem est';
export const Tooltip = <Help {...(Help.args as TooltipProps)} />;
