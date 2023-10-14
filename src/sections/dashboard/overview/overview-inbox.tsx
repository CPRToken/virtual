import type { FC } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

interface Schedule {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  scheduleDate: Date;
  mediaThumbnail?: string;
  name?: string;
  receiverName?: string;
  currentEmail?: string;
  senderOnline?: boolean;
  to?: string;
}

interface OverviewScheduleProps {
  schedules: Schedule[];

}

export const OverviewSchedules: FC<OverviewScheduleProps> = (props) => {
  const { schedules } = props;

  const { t } = useTranslation();

  return (
    <Card>
        <CardHeader
            title={t(tokens.headings.scheduledEmails)}
            action={
          <IconButton color="inherit">
            <SvgIcon fontSize="small">
              <RefreshCcw01Icon />
            </SvgIcon>
          </IconButton>
        }
      />
      <List disablePadding>
        {schedules.map((message) => {
            const ago = new Date(message.scheduleDate.seconds * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

            return (
                <ListItem
                    key={message.id}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer',
                        },
                    }}
                >
                    <ListItemAvatar>
                        {message.senderOnline ? (
                            <Badge
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom',
                                }}
                                color="success"
                                variant="dot"
                            >
                                <Avatar src={message.mediaThumbnail} />
                            </Badge>
                        ) : (
                            <Avatar src={message.currentEmail} />
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={
                            <div>
                                <div>
                                    <Typography variant="subtitle2">
                                        {message.title}  {/* Existing Field */}
                                    </Typography>
                                </div>

                            </div>
                        }
                        secondary={
                            <div>
                                <div>
                                    <Typography color="text.secondary" variant="body2">
                                        {message.description}  {/* Existing Field */}
                                    </Typography>
                                </div>
                                <div>
                                    {/* Add your new columns here */}
                                    <Typography variant="subtitle2">
                                        {message.to}  {/* New Column 1 */}
                                    </Typography>

                                </div>
                            </div>
                        }
                    />

                    <Typography variant="caption">{ago}</Typography>
                    <Typography variant="caption"></Typography>
                </ListItem>

            );
        })}
      </List>
      <Divider />
      <CardActions>

      </CardActions>
    </Card>
  );
};

OverviewSchedules.propTypes = {
  schedules: PropTypes.array.isRequired,
};
