<template>
    <Bar :chart-data="chartData" :height="Number(height)" :width="Number(width)" />
</template>
<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default defineComponent({
    components: { Bar },
    props: {
        data: {
            required: true,
            type: Object,
        },
        options: {
            required: false,
            type: Object,
            default: () => ({
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        // X軸グリッド非表示
                        gridLines: {
                            display: false
                        }
                    }],
                    // Y軸
                    yAxes: [{
                        display: true,
                        position: 'right',
                        ticks: {
                            // 0から始まる
                            beginAtZero: true,
                            // 最大5目盛
                            maxTicksLimit: 5,
                        },
                    }]
                },
            }),
        },
        height: {
            required: false,
            type: String,
            default: '300',
        },
        width: {
            required: false,
            type: String,
            default: undefined,
        }
    },
    setup(props, context) {
        return { chartData: props.data, chartOptions: props.options };
    },
});
</script>
<style lang="scss" scoped>
canvas {
    max-height: 100vh;
}
</style>