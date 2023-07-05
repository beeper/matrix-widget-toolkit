/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ElementAvatar } from '@beeper/matrix-widget-toolkit-mui';
import { useWidgetApi } from '@beeper/matrix-widget-toolkit-react';
import { Box, Card, CardHeader } from '@mui/material';
import { ReactElement } from 'react';
import { NavigationBar } from '../NavigationPage';

/**
 * A component that shows the user information that were given in the widget URL.
 */
export const WelcomePage = (): ReactElement => {
  const widgetApi = useWidgetApi();
  const userDisplayName =
    widgetApi.widgetParameters.displayName ?? widgetApi.widgetParameters.userId;

  return (
    <>
      <NavigationBar title="Welcome" />

      <Box m={1}>
        <Card elevation={0}>
          <CardHeader
            avatar={
              <ElementAvatar
                userId={widgetApi.widgetParameters.userId ?? '?'}
                displayName={widgetApi.widgetParameters.displayName}
                avatarUrl={widgetApi.widgetParameters.avatarUrl}
              />
            }
            title={`Welcome ${userDisplayName}`}
          />
        </Card>
      </Box>
    </>
  );
};
