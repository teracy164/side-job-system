<template>
    <Bar v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" :height="height" :width="width" />
</template>
<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, Title, Legend, CategoryScale, LinearScale, ChartData, ChartOptions } from 'chart.js'
import { PropType } from 'vue';

ChartJS.register(BarElement, Title, Legend, CategoryScale, LinearScale);

export default defineComponent({
    components: { Bar },
    props: {
        data: {
            required: true,
            type: Object as PropType<ChartData>,
        },
        options: {
            required: false,
            type: Object as PropType<ChartOptions>,
            default: () => ({
                maintainAspectRatio: false,
                responsive: true,
                scales: {},
            }),
        },
        height: {
            required: false,
            type: Number,
            default: 250,
        },
        width: {
            required: false,
            type: Number,
            default: undefined,
        }
    },
    watch: {
        data(value: any) {
            this.chartData = value;
            this.$forceUpdate();
        }
    },
    setup(props, context) {
        const chartData: ChartData | null = props.data;
        const chartOptions: ChartOptions | null = props.options;
        return { chartData, chartOptions, height: props.height, width: props.width };
    },
});
</script>
<style lang="scss" scoped>
</style>