import { createWebHistory, createRouter } from 'vue-router';
import MatchSchedule from '@/components/MatchSchedule';
import MatchLeaderboard from '@/components/MatchLeaderboard';
import NotFound from '@/components/NotFound';

const routes = [
    {
        path: '/',
        component: MatchSchedule
    },
    {
        path: '/schedule',
        component: MatchSchedule
    },
    {
        path: '/leaderboard',
        component: MatchLeaderboard
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;