<script setup>
    // import { inject } from 'vue';
    import Layout from '@views/layout/index.vue';

    import Tabs from './components/tabs.vue';
    import Tab from './components/tab.vue';

    import Balance from './components/balance.vue';
    import Courses from './components/courses.vue';
    import Table from './components/table.vue';
    import Statistics from './components/statistics.vue';

    import Transaction from './modals/transaction.vue';

</script>

<template>
    <Layout>
        <Tabs>
            <Tab title="Главная" icon="home" class="tabs__content tabs__content--main">
                <Balance class="tab__balance balance--only-mobile"/>
                <Table class="tab__table"></Table>
            </Tab>
            <Tab title="Статистика" icon="statistics" class="tabs__content tabs__content--statistics">
                <Statistics class="tab__statictics"></Statistics>
            </Tab>
            <Tab title="Курс" icon="dollar" class="tabs__content tabs__content--rates"> 
                <Courses class="tab__courses"></Courses>
                <Balance class="tab__balance balance--only-desktop"/>
            </Tab>
        </Tabs>
    </Layout>
    <Transaction></Transaction>
</template>