import { React, Immutable, type UseDataSource, defaultMessages as jimucoreMessages, type ImmutableObject, getAppStore, AllDataSourceTypes, hooks, type DataSourceJson } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { defaultMessages as jimuiMessages } from 'jimu-ui'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { type ChartTools, type IMConfig, type IWebChart } from '../config'
import { ChartSettings } from './settings'
import defaultMessages from './translations/default'
import { getSeriesType } from 'jimu-ui/advanced/chart'
import OutputSourceManager from './data-source'

const SUPPORTED_TYPES = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

type SettingProps = AllWidgetSettingProps<IMConfig>

const Setting = (props: SettingProps): React.ReactElement => {
  const {
    id,
    useDataSources: propUseDataSources,
    outputDataSources: propOutputDataSources,
    onSettingChange,
    config: propConfig,
    label
  } = props

  const translate = hooks.useTranslation(defaultMessages, jimuiMessages, jimucoreMessages)

  const { template = '', webChart, tools } = propConfig
  const seriesType = getSeriesType(webChart?.series as any) ?? 'barSeries'
  const outputDataSourceId = propOutputDataSources?.[0] ?? ''
  const outputDataSourceLabel = translate('outputStatistics', { name: label })

  const handleUseDataSourceChange = (useDataSources: UseDataSource[]): void => {
    const config = propConfig.without('webChart').set('tools', { cursorEnable: true }).without('template')
    onSettingChange({ id, useDataSources, config })
  }

  const handleOutputCreate = (dataSourceJson: DataSourceJson) => {
    onSettingChange({ id }, [dataSourceJson])
  }

  const handleFieldsChange = (fields: string[]) => {
    const useDataSources = Immutable.setIn(propUseDataSources, ['0', 'fields'], fields).asMutable({ deep: true })
    onSettingChange({ id, useDataSources })
  }

  const handleTemplateChange = (templateId: string, webChart: ImmutableObject<IWebChart>): void => {
    const config = propConfig.set('template', templateId).set('webChart', webChart).set('tools', { cursorEnable: true })
    onSettingChange({ id, config })
  }

  //Update output ds label when the label of widget changes
  React.useEffect(() => {
    const outputDataSource = getAppStore().getState().appStateInBuilder.appConfig?.dataSources?.[outputDataSourceId]
    if (outputDataSource && outputDataSource.label !== outputDataSourceLabel) {
      onSettingChange({ id }, [{ id: outputDataSourceId, label: outputDataSourceLabel }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputDataSourceLabel])

  const handleWebChartChange = (webChart: ImmutableObject<IWebChart>): void => {
    const config = propConfig.set('webChart', webChart)
    onSettingChange({ id, config })
  }

  const handleToolsChange = (tools: ImmutableObject<ChartTools>): void => {
    onSettingChange({ id, config: propConfig.set('tools', tools) })
  }

  return (
    <div className='widget-setting-chart jimu-widget-setting'>
      <div className='w-100 h-100'>
        <div className='w-100'>
          <SettingSection className='d-flex flex-column pb-0'>
            <SettingRow label={translate('data')} flow="wrap" level={1}>
              <DataSourceSelector
                isMultiple={false}
                aria-describedby='chart-blank-msg'
                mustUseDataSource
                types={SUPPORTED_TYPES}
                useDataSources={propUseDataSources}
                onChange={handleUseDataSourceChange}
                widgetId={id}
              />
            </SettingRow>
          </SettingSection>
        </div>
        <ChartSettings
          type={seriesType}
          template={template}
          onTemplateChange={handleTemplateChange}
          useDataSources={propUseDataSources}
          tools={tools}
          webChart={webChart}
          onToolsChange={handleToolsChange}
          onWebChartChange={handleWebChartChange}
        />
        {propUseDataSources?.length && <OutputSourceManager
          widgetId={id}
          dataSourceId={outputDataSourceId}
          originalUseDataSource={propUseDataSources?.[0]}
          onCreate={handleOutputCreate}
          onFieldsChange={handleFieldsChange} />}
      </div>
    </div>
  )
}

export default Setting
