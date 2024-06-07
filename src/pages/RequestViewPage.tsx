import {Button, Col, Row, Space, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import placeRequestStore from "../stores/PlaceRequestStore";
import {useMemo} from "react";

const {Title, Paragraph} = Typography;

interface InfoPartProps {
    title: string;
    content: string;
}

const InfoPart = ({title, content}: InfoPartProps) => {
    return (
        <>
            <Title level={4}>{title}</Title>
            <Paragraph>{content}</Paragraph>
        </>
    );
};

const RequestViewPage = () => {
    // TODO: Добавить useEffect.
    const {requestId} = useParams();
    const navigate = useNavigate();

    const formatter = useMemo<Intl.DateTimeFormat>(() => {
        return new Intl.DateTimeFormat("ru", {
            hour: "numeric",
            minute: "numeric",
        });
    }, []);

    const request = placeRequestStore.placeRequests.find((req) => req.id === requestId);

    return (
        <>
            <Row style={{marginTop: 30}}>
                <Col span={3} offset={3}>
                    <Button size="large" danger onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <Title>
                        {request?.account
                            ? `Смена роли пользователя ${request.account.name}`
                            : "Добавление эко-места на карту"}
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={4}>
                    <InfoPart title="Название эко-места" content={request!.ecoPlace.name} />

                    <InfoPart title="Тип" content={request!.ecoPlace.ecoPlaceType.name} />

                    <InfoPart title="Описание эко-места" content={request!.ecoPlace.description} />

                    <InfoPart
                        title="Время работы:"
                        content={`${formatter.format(new Date(request!.ecoPlace.startTime))} - ${formatter.format(
                            new Date(request!.ecoPlace.endTime)
                        )}`}
                    />

                    <InfoPart
                        title="Координаты"
                        content={`${request!.ecoPlace.coordinates.x}, ${request!.ecoPlace.coordinates.x}`}
                    />

                    <InfoPart title="Отзыв о месте" content={request!.description} />
                </Col>
            </Row>
            <Row>
                <Col span={6} offset={18}>
                    <Space>
                        <Button
                            size="large"
                            danger
                            type="primary"
                            onClick={() => {
                                placeRequestStore.reviewRequest(request!.id, false).then(() => {
                                    navigate(-1);
                                });
                            }}
                        >
                            Отказать
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                placeRequestStore.reviewRequest(request!.id, true).then(() => {
                                    navigate(-1);
                                });
                            }}
                        >
                            Подтвердить
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default RequestViewPage;
