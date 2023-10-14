import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import { subDays, subHours, subMinutes, subMonths } from 'date-fns';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';

import { useCallback, useState, useEffect } from 'react';
import {socialApi} from "src/api/social/socialApi";


import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { AccountBillingSettings } from 'src/sections/dashboard/account/account-billing-settings';
import { AccountGeneralSettings } from 'src/sections/dashboard/account/account-general-settings';
import { AccountNotificationsSettings } from 'src/sections/dashboard/account/account-notifications-settings';
import { AccountTeamSettings } from 'src/sections/dashboard/account/account-team-settings';
import { AccountSecuritySettings } from 'src/sections/dashboard/account/account-security-settings';
import type { Profile } from 'src/types/social';
import {auth} from "../../libs/firebase";
import {tokens} from "../../locales/tokens";
import {useTranslation} from "react-i18next";

const now = new Date();

const tabs = [
  { label: 'General', value: 'general' },

  { label: 'Equipo', value: 'team' },

  { label: 'Seguridad', value: 'security' },
];

const Page: NextPage = () => {
    const [uid, setUid] = useState<string | null>(auth.currentUser ? auth.currentUser.uid : null);
    const [user, setUser] = useState<Profile | null>(null);

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [currentTab, setCurrentTab] = useState<string>('general');

    const { t } = useTranslation();

    useEffect(() => {
        if (!uid) return; // Exit if uid is null

        const fetchUserData = async () => {
            try {
                const userData = await socialApi.getProfile({ uid });

                if (!userData) {
                    console.error("User data not found");
                    return;
                }

                setUser(userData);          // Use userData instead of fetchedUser
                setAvatarUrl(userData.avatar);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [uid]);




  usePageView();


  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);


  return (
    <>
      <Seo title="Dashboard: Account" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
              <Typography variant="h4">{t(tokens.nav.account)}</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {currentTab === 'general' && user && (
            <AccountGeneralSettings
              avatar={user.avatar || ''}
              email={user.email || ''}
              name={user.name || ''}
              maritalStatus={user.maritalStatus || ''}
              currentCity={user.currentCity || ''}
              quote={user.quote || ''}
              university={user.university || ''}
            />
          )}
          {currentTab === 'billing' && (
            <AccountBillingSettings
              plan="standard"
              invoices={[
                {
                  id: '5547409069c59755261f5546',
                  amount: 4.99,
                  createdAt: subMonths(now, 1).getTime(),
                },
                {
                  id: 'a3e17f4b551ff8766903f31f',
                  amount: 4.99,
                  createdAt: subMonths(now, 2).getTime(),
                },
                {
                  id: '28ca7c66fc360d8203644256',
                  amount: 4.99,
                  createdAt: subMonths(now, 3).getTime(),
                },
              ]}
            />
          )}
            {currentTab === 'team' &&(
                <AccountTeamSettings
                    members={[
                        {
                            avatar: avatarUrl,
                            email: user?.email,
                            name: user?.name,
                            role: 'Owner',

                        },

                ]}


                     />
            )}




            {currentTab === 'notifications' && <AccountNotificationsSettings />}
          {currentTab === 'security' && (
            <AccountSecuritySettings
              loginEvents={[
                {
                  id: '1bd6d44321cb78fd915462fa',
                  createdAt: subDays(subHours(subMinutes(now, 5), 7), 1).getTime(),
                  ip: '95.130.17.84',
                  type: 'Credential login',
                  userAgent: 'Chrome, Mac OS 10.15.7',
                },
                {
                  id: 'bde169c2fe9adea5d4598ea9',
                  createdAt: subDays(subHours(subMinutes(now, 25), 9), 1).getTime(),
                  ip: '95.130.17.84',
                  type: 'Credential login',
                  userAgent: 'Chrome, Mac OS 10.15.7',
                },
              ]}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
